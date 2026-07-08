import historymodel from "../Models/history.model.js";

//// Add History
export const addhistory = async (req, res) => {
    try {
        const { activity_type, data } = req.body;

        if (!activity_type || !data) {
            return res.status(400).json({
                success: false,
                message: "Activity type and data are required"
            });
        }

        const history = await historymodel.create({
            userId: req.id,
            activity_type,
            data
        });

        // Keep only latest 20 records
        const totalHistory = await historymodel
            .find({ userId: req.id })
            .sort({ createdAt: -1 });

        if (totalHistory.length > 20) {
            const extraHistory = totalHistory.slice(20);

            for (const item of extraHistory) {
                await item.deleteOne();
            }
        }

        return res.status(201).json({
            success: true,
            message: "History added successfully",
            history
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//// Get User History
export const gethistory = async (req, res) => {
    try {
        const historydata = await historymodel
            .find({ userId: req.id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            historydata
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//// Delete Single History
export const deletehistory = async (req, res) => {
    try {
        const { id } = req.params;

        const historydt = await historymodel.findById(id);

        if (!historydt) {
            return res.status(404).json({
                success: false,
                message: "History not found"
            });
        }

        if (
            historydt.userId.toString() !==
            req.id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await historydt.deleteOne();

        return res.status(200).json({
            success: true,
            message: "History deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//// Clear All History
export const clearHistory = async (req, res) => {
    try {

        await historymodel.deleteMany({
            userId: req.id
        });

        return res.status(200).json({
            success: true,
            message: "All history cleared successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};