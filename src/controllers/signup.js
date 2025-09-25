const bcrypt = require("bcrypt");
const User = require("../models/User");
const sequelize = require("../config/dbConfig");

exports.signUp = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      status,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await t.rollback();
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await User.create(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        status,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newEmployee.id,
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        email: newEmployee.email,
        status: newEmployee.status,
      },
    });
  } catch (error) {
    await t.rollback();
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
