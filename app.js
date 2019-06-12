
// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyClA96VRvpYSaCSfgTdu9at_lW9nyCdnp4",
  authDomain: "hiringdb-2ad0f.firebaseapp.com",
  databaseURL: "https://hiringdb-2ad0f.firebaseio.com",
  projectId: "hiringdb-2ad0f",
  storageBucket: "hiringdb-2ad0f.appspot.com",
  messagingSenderId: "823414478504",
  appId: "1:823414478504:web:6dcd523a0adae859"
});

//Get a reference to database service
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

const fullName = document.querySelector('#fullName');
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const inputFile = document.querySelector('#file');
const submitbtn = document.querySelector('#submit');
const form = document.querySelector('#form-join');
var selectedFile;


$('#chooseFile').bind('change', (event) => {
  selectedFile = event.target.files[0];

  var filename = $("#chooseFile").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload-wrapper").removeClass('active');
    $("#noFile").text("Upload file");
    $('#deleteFile').css({ 'display': 'none' });
  }
  else {
    $(".file-upload-wrapper").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
    $('#deleteFile').css({ 'display': 'block' });
  }
});

$('#deleteFile').click(() => {
  $(".file-upload-wrapper").removeClass('active');
  $("#noFile").text("Upload file");
  $('#deleteFile').css({ 'display': 'none' });
});

$('#form-join').submit((event) => {
  event.preventDefault();
  // console.log(resumeFile.value);
  var fileName = selectedFile.name;
  var storageRef = firebase.storage().ref();
  /* uploadTask.on('state_changed', (snapshot)=>{
 
    }, (error)=>{}, 
    ()=>{
        var downlUrl = uploadTask.snapshot.downloadURL;
        console.log(downlUrl);
    });  */
  db.collection('hiringAplications').add({
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    resume: fileName
  })
    .then((docRef) => {
      var myfile = storageRef.child('resume/' + docRef.id + '_' + fullName.value + '_' + fileName);
      myfile.put(selectedFile);
      console.log("document saved with id: " + docRef.id);
      $('#form-join').css({ 'display': 'none' });
      $('#formTitle').text("Thank you, " + fullName.value);
      $('#text-submit').css({ 'display': 'block' });
    })
    .catch((error) => {
      console.error(error);
    });
});
