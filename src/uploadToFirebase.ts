import firebase from 'firebase/app';
import 'firebase/storage';
import {makeZip} from "./utils";
import {TaskOnTypes} from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyDFJHegTjYfZg59-3gVw6PEHoz01OaUzB0",
    authDomain: "file-upload-4880b.firebaseapp.com",
    projectId: "file-upload-4880b",
    storageBucket: "file-upload-4880b.appspot.com",
    messagingSenderId: "906741322976",
    appId: "1:906741322976:web:c325ee479ba4fda39b2c85"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

type Reference = firebase.storage.Reference;
type UploadTask = firebase.storage.UploadTask;

const upload = async (files: File[], taskOn: TaskOnTypes): Promise<any> => {
    try {
        const zip = await makeZip(files)
        const task = uploadToFireBase(zip)

        return task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            taskOn.next,
            taskOn.error,
            taskOn.complete
        )
    } catch (error) {
        // make some error actions
        return Promise.reject(error)
    }
}

function uploadToFireBase(blob: Blob, name: string = `${Date.now()}`): UploadTask {
    const zipName: String = `${name}.zip`
    const fileRef: Reference = storage.ref(`zip/${zipName}`);

    return fileRef.put(blob);
}

export default upload;
