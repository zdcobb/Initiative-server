let db = require('../../db/db');

class CharactersController {
    getAllCharacters(req, res) {
        res.status(200).send({
            success: 'true',
            message: 'All characters retrieved.',
            content: db
        });
    }
    getCharacter(req, res) {
        const id = parseInt(req.params.id, 10);
        const match = db.find((character) => character.id === id);
    
        if (!match) {
            return res.status(404).send({
                success: 'false',
                message: '[Error]: Character not found.'
            });
        } else {
            return res.status(200).send({
                success: 'true',
                message: 'Character found.',
                content: match
            });
        }
    }
    addCharacter(req, res) {
        if (!req.body.name) {
            return res.status(400).send({
                success: 'false',
                message: "[Error]: 'Name' is a required field."
            });
        } else if (!req.body.race) {
            return res.status(400).send({
                success: 'false',
                message: "[Error]: 'Race' is a required field."
            });
        } else if (!req.body.class) {
            return res.status(400).send({
                success: 'false',
                message: "[Error]: 'Class' is a required field."
            });
        }
    
        let character = {
            id: db.length + 1,
            name: req.body.name,
            race: req.body.race,
            class: req.body.class
        }
    
        db.push(character);
    
        return res.status(200).send({
            success: 'true',
            message: 'Character successfully added to the database.',
            content: character
        });
    }
    updateCharacter(req, res) {
        const id = parseInt(req.params.id, 10);
        let match = db.find((character, i) => character.id === id);
    
        if (!match) {
            return res.status(404).send({
                success: 'false',
                message: '[Error]: Character not found.'
            });
        }
        // Actual update process. Update any fields supplied with new values, else use the old ones
        match.name = req.body.name || match.name;
        match.race = req.body.race || match.race;
        match.class = req.body.class || match.class;
    
        return res.status(200).send({
            success: 'true',
            message: 'Character updated successfully!',
            content: match
        });
    }
    deleteCharacter(req, res) {
        const id = parseInt(req.params.id, 10);
        
        for (let i = 0; i < db.length; i++) {
            if (db[i].id === id) {
                db.splice(i, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'Character deleted.'
                });
            }
        }
    
        return res.status(400).send({
            success: 'false',
            message: '[Error]: Character not found.'
        });
    }
}

module.exports = new CharactersController();