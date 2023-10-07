const categoryModel = require("../models/category.model.js");
const categoryValidator = require("../validations/category.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const getAll = async (req, res) => {
    try {
        const data = await categoryModel.find({}).populate("events").sort({ createdAt: "desc" })
        if (!data && data.length === 0) {
            return res.status(404).json({ message: "Categories are not found" });
        }
        return res.status(200).json({
            message: "Categories are successfully",
            datas: data,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getDetail = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const data = await categoryModel.findById(idCategory).populate("events")
        if (!data) {
            return res.status(404).json({ message: "Category is not found" });
        }
        return res.status(200).json({
            message: "Category is successfully",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const data = await categoryModel.create(req.body)
        if (!data) {
            return res.status(404).json({
                message: "Creating category is not successful",
            });
        }
        return res.status(200).json({
            message: "Creating category is successful",
            datas: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { error } = categoryValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message || "Please re-check your data!",
            });
        }

        const idCategory = req.params.id;
        const data = await categoryModel.findByIdAndUpdate(idCategory, req.body, { new: true })
        if (!data) {
            return res.status(404).json({
                message: "Updating Category is not successful",
            });
        }
        return res.status(200).json({
            message: "Updating Category is successful",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const data = await categoryModel.findByIdAndDelete(idCategory)

        if (!data) {
            return res.status(404).json({
                message: "Deleting category is not successful",
            });
        }
        return res.status(200).json({
            message: "Deleting category is successful",
            data
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getAll,
    getDetail,
    createCategory,
    updateCategory,
    deleteCategory,
};

