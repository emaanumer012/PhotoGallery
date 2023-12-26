// storageService.js

async function getFolderSize(userId) {
    const folderPath = `${userId}`
    try {
        // List the objects in the specified folder
        const [files] = await storage.bucket(bucketName).getFiles({
            prefix: folderPath,
        })

        // Calculate the total size of files in the folder
        const folderSize = files.reduce(
            (acc, file) => acc + file.metadata.size,
            0
        )

        // Convert bytes to kilobytes
        const folderSizeInKB = folderSize / 1024

        console.log(
            `Size of folder "${folderPath}" in bucket "${bucketName}": ${folderSizeInKB.toFixed(
                2
            )} KB`
        )

        return folderSizeInKB
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}

function uploadtoBucket(userId, fileName, file) {
    bucket.upload(
        `${fileLink}`,
        {
            destination: `${userId}/${fileLink}`,
        },
        function (err, file) {
            if (err) {
                console.error(`Error uploading image ${fileLink}: ${err}`)
            } else {
                console.log(`Image ${fileLink} uploaded to ${bucketName}.`)
            }
        }
    )
}

module.exports = {
    getFolderSize,
    uploadtoBucket,
}
