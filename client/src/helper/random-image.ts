import Image1 from "/images/image1.jpg";
import Image2 from "/images/image2.jpeg";
import Image3 from "/images/image3.png";
import Image4 from "/images/image4.jpg";

const images = [Image1, Image2, Image3, Image4];

export function getRandomImages() {
    return images[Math.floor(Math.random() * images.length)];
}

export const users = [
    {
        name: "Daisy",
        image: Image1,
        username: "@daisy"
    },
    {
        name: "Sarah",
        image: Image2,
        username: "@sarah"
    },
    {
        name: "John",
        image: Image3,
        username: "@john"
    },
    {
        name: "Jane",
        image: Image4,
        username: "@jane"
    },
]

export function getRandomUsers() {
    return users[Math.floor(Math.random() * users.length)];
}