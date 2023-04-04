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
    # model = Sequential()
    # model.add(Dense(64, input_shape=(3,), activation='relu'))
    # model.add(Dense(1, kernel_regularizer=regularizers.l2(0.0001)))
    # model.add(Activation('softmax'))
    # model.compile(loss='squared_hinge',
    #               optimizer='adam',
    #               metrics=['accuracy'])
    # model.fit(X, y, epochs=150, batch_size=5)
    # # evaluate the keras model
    # _, accuracy = model.evaluate(X, y)
    # print('Accuracy: %.2f' % (accuracy * 100))
    #
    # converter = tf.lite.TFLiteConverter.from_keras_model(model)
    # tflite_model = converter.convert()
    # with open('grade.tflite', 'wb') as f:
    #     f.write(tflite_model)
    pipe = joblib.load('svm.joblib')
    Xnew= np.array([[60,55,1], [50,60,5], [70,40,3]])

    # make a prediction
    ynew = pipe.predict(Xnew)
    # show the inputs and predicted outputs
    for i in range(len(Xnew)):
     print("X=%s, Predicted=%s" % (Xnew[i], ynew[i]))


model()
