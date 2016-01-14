createSubmitButton = function() {
    if (document.contains(document.getElementById("submitButton1"))) {
        document.getElementById("submitButton1").remove();
    }
    var submitButton = document.createElement('button');
    submitButton.id = 'submitButton1';
    submitButton.innerHTML = 'Submit';
    submitButton.classList.add('btn','waves-effect', 'waves-light');
    submitButton.setAttribute('type','submit');
    submitButton.setAttribute('name','action');

    var submitForm = document.getElementById('submit-form1');
    submitForm.appendChild(submitButton);
}