import joblib
import numpy as np
import pandas as pd
from keras import Sequential, regularizers
from keras.layers import Dense,  Activation

import tensorflow as tf
from sklearn.datasets import make_blobs
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.svm import SVC
from joblib import dump
from tensorflow.python.keras.wrappers.scikit_learn import KerasClassifier
import pickle
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType


def model():
    dataset = pd.read_csv("dataFYP.csv", sep=',')
    X = dataset.iloc[:, [0, 1, 2]].to_numpy()
    y = dataset.iloc[:, 3].to_numpy()

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    svm = SVC(kernel='linear', C=1, random_state=42)
    svm.fit(X_train, y_train)
    predictions = svm.predict(X_test)
    # Evaluate predictions
    print(accuracy_score(y_test, predictions))
    print(confusion_matrix(y_test, predictions))
    print(classification_report(y_test, predictions))

    # Evaluate SVM model
    accuracy = svm.score(X_test, y_test)
    print("SVM accuracy:", accuracy)
    dump(svm, 'svm.joblib')
    with open('svm.pkl', 'wb') as f:
        pickle.dump(svm, f)

    pipe = joblib.load('svm.joblib')
    Xnew= np.array([[60,55,1], [50,60,5], [70,40,3]])

    # make a prediction
    ynew = pipe.predict(Xnew)
    # show the inputs and predicted outputs
    for i in range(len(Xnew)):
     print("X=%s, Predicted=%s" % (Xnew[i], ynew[i]))
    with open('svm.pkl', 'rb') as f:
        svm = pickle.load(f)

    ynew = svm.predict(Xnew)
    for i in range(len(Xnew)):
     print("X=%s, Predicted=%s" % (Xnew[i], ynew[i]))

    initial_type = [('float_input', FloatTensorType([1, 3]))]
    onx = convert_sklearn(svm, initial_types=initial_type)
    # Save the ONNX model
    with open('model.onnx', 'wb') as f:
        f.write(onx.SerializeToString())

model()
