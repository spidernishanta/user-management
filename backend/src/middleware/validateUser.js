const { body, validationResult } = require("express-validator");

exports.validateUser = [
  // validation rules
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("age")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Age must be a positive integer"),

  // Error handling
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
