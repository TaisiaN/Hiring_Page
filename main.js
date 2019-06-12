const inputFile = document.getElementById('file');
const fileName = document.getElementById('file-upload-name');

inputFile.addEventListener('change', showFileName);

function showFileName(event) {
  // the change event gives us the input it occurred in
  const input = event.srcElement;

  // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  const nameFile = input.files[0].name;

  fileName.classList.remove('file-upload-wrapper');
  fileName.className += ' after-upload';

  // use fileName however fits your app best, i.e. add it into a div
  fileName.setAttribute('data-text', nameFile);
}
