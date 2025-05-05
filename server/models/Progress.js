// const mongoose = require("mongoose");

// const progressSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   completedMaterials: [
//     {
//       materialId: { type: mongoose.Schema.Types.ObjectId, ref: "StudyMaterial" },
//       completedAt: Date,
//     }
//   ],
//   mockTestScores: [
//     {
//       testId: { type: mongoose.Schema.Types.ObjectId, ref: "MockTest" },
//       score: Number,
//       takenAt: Date,
//     }
//   ],
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Progress", progressSchema);
