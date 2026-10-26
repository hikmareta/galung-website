const width = Number(new URLSearchParams(location.search).get('w'));
document.getElementById('preview').width = [280, 320, 390, 768].includes(width) ? width : 390;
