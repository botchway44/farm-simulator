# CODING CHALLENGE

A farm building management application. The system consists of a Back-end REST API.
The application will create farm buildings with farm units, and feed those farm units.


## ⚙️ Getting Started
 - cd into the project folder and run `npm install` or `yarn`
 - 
### FEEDING ALGORITHM
 - To Feed a unit
     - verify if the unit is alive, is not currenly feeding or is in the feeding interval
     - To verify if the if the unit is not currently feeding, we lock the currently fed unit, allow it to feed and unlock it
     - 
 - To Feed a Building
     - verify if the building is in the feeding interval
     - Go through all building units and feed them.
     - To verify if the if the building is not currently feeding, we lock the currently fed building, allow it to feed and unlock it


     - 

## Built with

- Nodejs, Express with Typescript
- Sequelize
- Postgress
- **[Postman Collection](https://go.postman.co/workspace/My-Workspace~89e3bd0a-f9ea-4223-82fd-f1a8cced51d3/collection/3882376-02681d2f-6ce1-4d52-b961-f03660ddefc3?action=share&creator=3882376)** - Use link to join Postman collection