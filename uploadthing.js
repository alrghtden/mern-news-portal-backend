const { createUploadthing } = require('uploadthing/express');

const f = createUploadthing();

exports.uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log("Upload selesai:", data);
  }),
};
