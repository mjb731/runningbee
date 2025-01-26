const ResultSchema = new mongoose.Schema({
    clinic_id: ObjectId, // This is a "foreign key" to Clinic collection
    patient_id: Number, // This is a "foreign key" to Patient collection
    field_nm: String,
    field_value: String
  });
  
  // Instantiate the model to access the Result collection in DB
  const ResultModel = mongoose.model('Result', ResultSchema);
  
  async function getTableData(clinicId) {
    // part 1
    const dpList = await ResultModel.find({ clinic_id: clinicId }).sort({ patient_id: 1}).exec();
  
    // part 2
    const dynamicList = [];
    let rowMap;
    let prevRowId = -1;
    for (const dp of dpList) {
      if (dp.patient_id !== prevRowId) {
        if (prevRowId != -1) {
          dynamicList.push(rowMap.values())
        }
        rowMap = new Map([
          ['patient_id', dp.patient_id]
          ['a', -1],
          ['b', -1],
          ['c', -1]
        ]);
      }
      prevRowId = dp.patient_id;
  
      rowMap.set(dp.field_nm, dp.field_value);
    }
    if (prevRowId != -1) {
      dynamicList.push(rowMap.values())
    }
  
    return dynamicList;
  }

  async function getTableData(clinicId) {
    // part 1
    const dpList = await ResultModel.find({ clinic_id: clinicId }).sort({ patient_id: 1}).exec();
  
    const dpList = await ResultModel.aggregate([
      {
        $match:{ clinic_id: clinicId }
      },
      {
        $group: {
          patient_id: patient_id,
          
        }
      }
    ])



    // part 2
    const dynamicList = [];
    let rowMap;
    let prevRowId = -1;
    for (const dp of dpList) {
      if (dp.patient_id !== prevRowId) {
        if (prevRowId != -1) {
          dynamicList.push(rowMap.values())
        }
        rowMap = new Map([
          ['patient_id', dp.patient_id]
          ['a', -1],
          ['b', -1],
          ['c', -1]
        ]);
      }
      prevRowId = dp.patient_id;
  
      rowMap.set(dp.field_nm, dp.field_value);
    }
    if (prevRowId != -1) {
      dynamicList.push(rowMap.values())
    }
  
    return dynamicList;
  }


  
