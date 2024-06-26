const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const fs = require('fs');
const { model } = require('mongoose');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const uploadAlbum = async (req, res) => {
    try {
        let imgLink = './services/temp/' + req.file.filename;
        const uploadImgResult = await cloudinary.uploader.upload(imgLink, { resource_type: 'image' });
        fs.unlink(imgLink, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
        });
        let album = new Album({
            title: req.body.title,
            img: uploadImgResult.secure_url,
            artist: req.body.artist,
            uploadId: req.body.uploadId,
            genre: req.body.genre,
            year: req.body.year,
            tracks: req.body.tracks,
        });
        album.save(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Album uploaded successfully!', album: album });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const publicId = album.img.split('/').pop();
        const deleteResult = await cloudinary.uploader.destroy(publicId);
        if (deleteResult.result !== 'ok') {
            return res.status(500).json({ message: 'Failed to delete album image from cloudinary', deleteResult });
        }
        album.remove();
        res.json({ message: 'Album deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const { title, artist, genre, year, tracks, img } = req.body;
        if (title) album.title = title;
        if (artist) album.artist = artist;
        if (genre) album.genre = genre;
        if (year) album.year = year;
        if (tracks) album.tracks = tracks;
        if (img) {
            const publicId = album.img.split('/').pop();
            const deletionResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
            if (deletionResult.result !== 'ok') {
                console.error('Error deleting image from Cloudinary:', deletionResult.error.message);
            }
            let imgLink = './services/temp/' + req.file.filename;
            const uploadImgResult = await cloudinary.uploader.upload(imgLink, { resource_type: 'image' });
            fs.unlink(imgLink, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            album.img = uploadImgResult.secure_url;
        }
        album.save();
        res.json({ message: 'Album updated successfully!', album: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAlbums, uploadAlbum, deleteAlbum, updateAlbum };