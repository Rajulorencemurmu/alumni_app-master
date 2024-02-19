const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const User = require("./models/users");
const Message = require("./models/message");
const bcrypt = require("bcrypt");

mongoose
  .connect(
    "mongodb+srv://qq5474254:rajuismypassword@cluster0.yqsz3lk.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("err occured", err);
  });

const port = 8000;
app.listen(port, () => {
  console.log("Server is running on port 8000");
});

//User Routes
app.post("/register", async (req, res) => {
  const { name, email, password, number, image } = req.body;
  console.log("Request payload:", req.body);

  console.log("Image in backend=", image);

  console.log("after register and before try");

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("after try");
    // Check if the number is provided and not null
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      // number:number,
      ...(number !== undefined ? { number } : {}),
      image: image,
    });

    console.log("after running newUser");
    // Save the user to the database
    const userData = await newUser.save();
    console.log("user data", userData);

    console.log("after saving it into db");
    res.status(201).send(userData);
    console.log("it has reached here");
  } catch (error) {
    if (error.code === 11000 && error.keyValue) {
      // Duplicate key error (E11000) handling
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];
      return res.status(400).json({
        message: `Duplicate key error. ${duplicateField} '${duplicateValue}' already exists.`,
      });
    }
    console.log("error log");
    console.error("Error in registration:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
  console.log("error log1");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email=", email);
  console.log("pass", password);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log("you found email", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//endpoint to access all users currently logged in
app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;
  console.log("logged in user in index.js=", loggedInUserId);

  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Error retrieving users", err);
      res.status(500).json({ message: "Error retrieving users" });
    });
});

//endpoint to send a request to a user
app.post("/friendRequest", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  console.log("current user in index.js=", currentUserId);
  console.log("selected user in index.js=", selectedUserId);

  // Validate that both IDs are valid ObjectId strings
  if (!isValidObjectId(currentUserId) || !isValidObjectId(selectedUserId)) {
    return res.status(400).json({ error: "Invalid user IDs" });
  } else {
    console.log("valid");
  }

  try {
    // Updating the recipient's friend request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    // Also updating the sender's sent friend request array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing friend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Function to check if a string is a valid ObjectId
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

//endpoints to show friend request
app.get("/friendRequest/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Log the userId to verify it's received correctly
    console.log("Received userId:", userId);

    //fetching the user based on userId
    const user = await User.findById(userId)
      .populate("friendRequests", "name email image")
      .lean();
    // Log the user and friendRequests to verify
    console.log("User:", user);
    console.log("Friend Requests:", user.friendRequests);
    // const friendRequests=user.friendRequests;
    // res.json(friendRequests);
    res.json(user.friendRequests);
  } catch (error) {
    console.log("error occured");
    res.status(500).json({ message: "Internal server error " });
  }
});

//endpoint to accept friend-request
app.post("/friendRequest/accept", async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;

    if (!senderId || !recipientId) {
      return res
        .status(400)
        .json({
          message: "SenderId and RecipientId are required in the request body",
        });
    }

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ message: "Sender or Recipient not found" });
    }

    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    // Filtering out recipient id after accepting friend request
    recipient.friendRequests = recipient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recipientId.toString()
    );

    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in friendRequest accept" });
  }
});

//endponts to access all  the friends of a user
app.get("/acceptedFriends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in getting Accepted Friends");
  }
});

///endpoint to get the userDetails to design the chat Room header
app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recipientId = await User.findById(userId);

    res.json(recipientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//sending messages
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/"); // Set the destination path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });

//endpoint to post Messages and store it in the backend
app.post("/messages", upload.single("imageFile"), async (req, res) => {
  try {
    const { senderId, recipientId, messageType, messageText } = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      // imageUrl: messageType === "image" ? req.file.filename : null,
      imageUrl:
        messageType === "image"
          ? `${req.file.filename}.${req.file.mimetype.split("/")[1]}`
          : null,
    });

    await newMessage.save();

    console.log("checking", typeof senderId);
    console.log("checking2", typeof recipientId);

    //consoling the message you are sending
    console.log("The message you are sending", newMessage);

    res.status(200).json({ message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//endpoint to fetch the messages between two users in the chatRoom
app.get("/messages/:senderId/:recipientId", async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const recipientObjectId = new mongoose.Types.ObjectId(recipientId);

    console.log("i am checking", typeof senderObjectId);
    console.log("i am checking2", typeof recipientObjectId);

    console.log("Messages Query Parameters:", {
      senderObjectId,
      recipientObjectId,
      query: {
        $or: [
          { senderId: senderObjectId, recipientId: recipientObjectId },
          { senderId: recipientObjectId, recipientId: senderObjectId },
        ],
      },
    });

    // const messages = await Message.find({
    //   $or: [
    //     { senderId: senderObjectId, recipientId: recipientObjectId },
    //     { senderId: recipientObjectId, recipientId: senderObjectId },
    //   ],
    // }).populate("senderId", "_id name")
    // .populate("recipientId", "_id name");

    //correct one
    const messages = await Message.find({
      $or: [
                { senderId: senderObjectId }, { recipientId: recipientObjectId },
               { senderId: recipientObjectId, recipientId: senderObjectId },
            ],
    })
      .populate("senderId", "_id name")
      .populate("recipientId", "_id name");

    console.log("Fetched messages:", messages);

    res.json(messages);
  } catch (error) {
    console.log("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/test", async (req, res) => {
//   try {
//     const message = await Message.findOne().populate("senderId", "_id name");
//     res.json(message);
//   } catch (error) {
//     console.log("Error fetching test message:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//endpoint to delete the messages!
app.post("/deleteMessages", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "invalid req body!" });
    }

    await Message.deleteMany({ _id: { $in: messages } });

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

app.get("/friend-requests/sent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("sentFriendRequests", "name email image")
      .lean();

    const sentFriendRequests = user.sentFriendRequests;

    res.json(sentFriendRequests);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server" });
  }
});

app.get("/friends/:userId", (req, res) => {
  try {
    const { userId } = req.params;

    User.findById(userId)
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const friendIds = user.friends.map((friend) => friend._id);

        res.status(200).json(friendIds);
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error" });
  }
});
