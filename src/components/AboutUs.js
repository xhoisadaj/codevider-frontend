import React from 'react'
import cats from '../assets/cats.jpeg'
import dog from '../assets/dog.jpeg'
export const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Your trusted source for all your pet's needs.</h2>
            <p className="mb-4">Welcome to Expo Pet Shop! We are your one-stop destination for all things pet-related, offering a wide range of high-quality products and services for your beloved animals. Whether you have a dog, cat, bird, or small pet, we have everything you need to keep them happy and healthy. Our knowledgeable staff is passionate about pets and ready to help you find the perfect items and provide expert advice. Visit us at the Expo and discover why we’re the favorite choice for pet owners!</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src={cats} alt="office content 1"/>
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src={dog} alt="office content 2"/>
        </div>
    </div>
</section>
  )
}
