const User = require('../models/userModel');
const dotenv = require ('dotenv')
dotenv.config();

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require ('crypto')

const client = new S3Client({ 
  region: "us-east-1", 
  credentials: {
    accessKeyId: process.env.AWS_KEY_ACESS, 
    secretAccessKey: process.env.AWS_KEY_SECRET
  } 
});


exports.createUser = async (req, res) => {
  try {
    const filename = crypto.randomBytes(15).toString('hex')
     await client.send(new PutObjectCommand({Bucket: 'fotos-carteirinha', Key: filename, Body: req.file.buffer, ContentType: req.file.mimetype}))
     const { name } = req.body;
    const newUser = new User({
      name,
      photo: `https://fotos-carteirinha.s3.amazonaws.com/${filename}`,
      lastUpdate: Date.now()
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error)
  }
};


exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserPhoto = async (req, res) => {
  try {
    if (!req.file){
      return res.status(404).json({ message: 'Need Phot' });
    } else if (req.file.size > 1*1024*1024) {
      return res.status(404).json({ message: 'Limit photo' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const currentPhoto = user.photo.split('/').pop()
    await client.send(new DeleteObjectCommand({Bucket: 'fotos-carteirinha', Key: currentPhoto }))
    const filename = crypto.randomBytes(15).toString('hex')
    await client.send(new PutObjectCommand({Bucket: 'fotos-carteirinha', Key: filename, Body: req.file.buffer, ContentType: req.file.mimetype}))
    user.photo = `https://fotos-carteirinha.s3.amazonaws.com/${filename}`;
    user.lastUpdate = Date.now();
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserName = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = req.body.name;
    user.lastUpdate = Date.now();
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
