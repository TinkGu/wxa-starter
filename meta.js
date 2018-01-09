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
            "default": "A React project"
        },
        "author": {
            "type": "string",
            "message": "Author"
        },
        "wxenhancer": {
            "type": "confirm",
            "message": "use rxjs and wx-enhancer?"
        }
    },
    "completeMessage": "Have Fun!"
};
