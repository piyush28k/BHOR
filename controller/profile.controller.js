import profileModel from "../model/profile.model.js";

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body; // Destrture userId from the request bodyuc

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const profile = await profileModel.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const allProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.find();
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      photo,
      title,
      location,
      bio,
      languages,
      skills,
      Experience,
      education,
      certifications,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const updatedProfile = await profileModel.findOneAndUpdate(
      { userId },
      {
        name,
        photo,
        title,
        location,
        bio,
        languages,
        skills,
        Experience,
        education,
        certifications,
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const addGigs = async (req, res) => {
  try {
    const { userId, title, photo, description, price, deliveryDate } = req.body;
    console.log(userId);

    if (!userId || !title || !description || !price || !deliveryDate) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const profile = await profileModel.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }

    const newGig = { title, photo, description, price, deliveryDate };
    profile.gigs.push(newGig);
    await profile.save();

    return res
      .status(200)
      .json({ msg: "gig add successfully" }, { gigs: profile.gigs });
  } catch (error) {
    console.error("gigs adding fail due to server error", error);
    return res.status(500).json({ msg: "server error in adding gigs" });
  }
};

export const deleteGig = async (req, res) => {
  try {
    const { id, userId } = req.body;

    if (!id || !userId) return res.status(400).json("id or userId not found");
    const profile = await profileModel.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }
    profile.gigs = profile.gigs.filter((gig)=>(gig._id.toString()!==id))
    await profile.save()

    return res.status(200).json({meg:"delete success"})
  } catch (err) {
    console.error("delete fail due to server error", err)
    return res.status(500).json({msg:"server error"})
  }
};
