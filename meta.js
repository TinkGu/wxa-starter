module.exports = {
    "prompts": {
        "name": {
            "type": "string",
            "required": true,
            "message": "Project name"
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A Wechat App"
        },
        "author": {
            "type": "string",
            "message": "Author"
        }
    },
    "completeMessage": "Have Fun!"
};
