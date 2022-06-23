const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Unsplash API
const count = 5;
const URL = `https://api.unsplash.com/photos/random/`;
const APIKey = 'evB7EmZM_5dgR5mT1SNWVnziDM7PXdOEy8MoarwIyvI';
const client_secret = "jyCu2LuA9PR3Dn5Q40cCmxV0Y4E_iReKFy2qqzTfz-Y";
const UnsplashAPI = `${URL}?client_id=${APIKey}&client_secret=${client_secret}&count=${count}`




//Cheak if all image were Loaded
function imgLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attribus) {
    for (const key in attribus) {
        element.setAttribute(key, attribus[key])
    }
}

//Create Elements FOr Links & Photo,Add and Dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.urls.description,
            title: photo.urls.alt_description,
        },);
        console.log(photo)
        //Event Listener , Cheack when each is finished loading
        img.addEventListener('load',imgLoaded)
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}


/*Get Photo From Unsplash API*/
async function getPhotos() {
    try {
        const response = await fetch(UnsplashAPI);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //cath Error Here
    }
}

//Check to see if scrolling near bottom of page, Load more photo

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
        ready = false;
        getPhotos();
    }
})

//Execution Photo
getPhotos();





