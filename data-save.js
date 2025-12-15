const { getFirestore } = require('./firebase-config');

async function saveField(vid, page, fieldName, fieldValue) {
    try {
        const db = getFirestore();
        const vRef = db.collection('visitors').doc(vid);
        
        const updateData = {};
        updateData[`data.${page}.${fieldName}`] = fieldValue;
        updateData[`data.${page}.timestamp`] = new Date().toISOString();
        updateData['lastUpdated'] = new Date().toISOString();
        
        await vRef.update(updateData);
        
        return { success: true };
    } catch (error) {
        console.error('saveField error:', error);
        return { success: false, error: error.message };
    }
}

async function saveMultipleFields(vid, page, fieldsData) {
    try {
        const db = getFirestore();
        const vRef = db.collection('visitors').doc(vid);
        
        const updateData = {};
        
        for (const [fieldName, fieldValue] of Object.entries(fieldsData)) {
            updateData[`data.${page}.${fieldName}`] = fieldValue;
        }
        
        updateData[`data.${page}.timestamp`] = new Date().toISOString();
        updateData['lastUpdated'] = new Date().toISOString();
        
        await vRef.update(updateData);
        
        return { success: true };
    } catch (error) {
        console.error('saveMultipleFields error:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    saveField,
    saveMultipleFields
};
