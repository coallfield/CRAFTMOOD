module.exports = class MoodboardDto {
    name;
    id;
    photos;

    constructor(model) {
        this.name = model.name
        this.id = model._id
        this.photos = model.photos
    }
}