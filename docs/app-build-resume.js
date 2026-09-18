function openSelectedResumePdf() {
  const type = document.getElementById('resumeType').value;
  window.open(`./pdfs/${type}.pdf`, '_blank');
}
