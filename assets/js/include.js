//insere la navbar
fetch('assets/include/navbar.html')
.then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById('include-navbar').innerHTML = data;
  });

//insere la footer
fetch('assets/include/footer.html')
.then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById('include-footer').innerHTML = data;
  });