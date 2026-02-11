import Industry from "../models/industry.js";

export const getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    return res.status(200).json(industries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createIndustry = async (req, res) => {
  try {
    const createdIndustry = await Industry.create(req.body);
    return res.status(200).json(createdIndustry);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
