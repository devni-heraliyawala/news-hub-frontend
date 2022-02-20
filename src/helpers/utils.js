const handleImageError = (e) => {
  var src = '/default-placeholder.png';
  e.target.src = src;
};

export {
  handleImageError,
}