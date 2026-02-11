import Industry from "../models/industry.js";

export const getIndustries = async (req, res) => {
  try {
    const industries = Industry.find();
    return res.status(200).json(industries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
