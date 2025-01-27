# runningbee

## Q1

### Q1a

1. Add a compound index for `clinic_id` and `patient_id`.  This index will be optimized for searching by `clinic_id` alone and `clinic_id` combined with `patient_id`.
1. Add a simple index for `patient_id`.  This index will be optimized for searching by `patient_id` alone.

### Q1b

`dynamicList` will be a list of Maps.  Each Map will contain ordered key-value pairs, where the key is `field_nm` and the value is `field_value`.  A new Map is created and added to `dynamicList` whenever the `patient_id` does not match the previous values - implying that `patient_id` should be sorted to prevent unexpected behavior.  Also, because `field_nm` is a key in the Map, only the last value set for a given `field_nm` will be stored in the Map for the `patient_id`.

### Q1c

```javascript
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
```

### Q1d

The MongoDB pattern to use is polymorphic pattern.
This pattern is useful when records in a collection are similar but not the same.
Different clinics could have different fields, but the same collection would could be queried regardless of clinic.
Adding an index on `clinical_id` can be helpful.

Another possibility is inheritance pattern, where each clinic result collection would be derived from a base result collection.
If queries are only on one clinic, this could improve performance.
The downside is that each new clinic would require a derived collection.

## Q2

The `1=1` snippet is always true, and as the first test in the AND clause, can be removed.
Most likely it was left over from development.

## Q3

### Q3a

### Q3b

Design a new logging system.

1. Requirements
    * use cloud for logging system
    * protect sensitive data (HIPAA)
    * design log message format
    * add logging levels
1. Design
    * use log management in cloud
    * add async logging to skibidi and lowkey
    * store logs in scalable and queryable db
    * monitor logs
1. Implement
    * add async logging in code
    * set up cloud logging
    * verify log messages coming through
1. Enhance
    * mask sensitive data
    * set retention
1. Collaborate
    * document
    * train
    * note usage in pr's

### Q4

Assumption that higher mean is better (throughput):

* Variant A has a lower mean than Control, so A is not desirable.
* Variant B has a higher mean but larger deviation, the latter of which makes B not desirable.
* Stick with Control for now.

Assumption that lower mean is better (cost, execution time):

* Variant A has lower mean than Control and has smaller deviation, making A desirable.
* Variant B has a higher mean, so B is not desirable.
* Choose Variant A.
