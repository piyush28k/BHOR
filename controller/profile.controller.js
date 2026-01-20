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
  const { user, service, location } = req.body;
  console.log(service)
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  const filter = {userId: { $ne: user }}
  if(location){
    filter.location = location
  }
  if(service){
    filter.title = service
  }

  const skip = (page - 1) * limit;
  try {
    const total = await profileModel.countDocuments(filter);
    const profiles = await profileModel
      .find(filter)
      .skip(skip)
      .limit(limit);
    
    res.json({ data:profiles, totalPage: Math.ceil(total / limit), page, total });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// const result = datas.filter((data) => {
//       const res = service ? data.title?.toLowerCase().includes(service.toLowerCase()) : true;
//       const loc = location ? data.location?.toLowerCase().includes(location.toLowerCase()) : true;
//       console.log("res: "+ res,"loc: "+ loc)
//       return res && loc;
//     });

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
      { new: true },
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
    profile.gigs = profile.gigs.filter((gig) => gig._id.toString() !== id);
    await profile.save();

    return res.status(200).json({ meg: "delete success" });
  } catch (err) {
    console.error("delete fail due to server error", err);
    return res.status(500).json({ msg: "server error" });
  }
};
