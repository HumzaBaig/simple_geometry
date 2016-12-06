
class ImageStuff {
  constructor(picIndex) {
    this.imgCanvas = document.getElementById("painting");
    this.imgCanvas.width = window.innerWidth;
    this.imgCanvas.height = window.innerHeight;
    this.context = this.imgCanvas.getContext('2d');
    this.images = [
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479496760/starry-night_zhsyre.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533005/cherry-blossom_oylyfw.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533009/girl-with-sun_fgdqge.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533009/lion_gxzji3.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533035/peacock_iciygt.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533020/random-famous-painting_iwmqeq.jpg",
                   "https://crossorigin.me/http://res.cloudinary.com/dzixj0ktk/image/upload/v1479533051/Les-cypres-a-Cagnes_rglsrl.jpg"
                  ];
    this.img = new Image();
    this.img.crossOrigin = "Anonymous";
    this.img.src = this.images[picIndex];
    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0, this.imgCanvas.width, this.imgCanvas.height);
    };
  }

  getData(x, y) {
    return this.context.getImageData(x, y, 1, 1);
  }
}

module.exports = ImageStuff;
