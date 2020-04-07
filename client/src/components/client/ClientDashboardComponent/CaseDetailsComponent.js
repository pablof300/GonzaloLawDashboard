import React, { useState }  from "react";
import { Tab, Container } from "semantic-ui-react";
import ProgCard from "../ProgBarComponent/ProgCard";
import { getCurrentUser } from "../../../../src/api/UserApi";



const CaseDetailsComponent = props => {

    const [userData, setUserData] = useState([]);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

  
    const loadUserData = async () => {
      const user = (await getCurrentUser()).data;
      setUserData(user.cases);
      setIsUserLoaded(true);
      console.log(user)
    };
    if (!isUserLoaded) {
      loadUserData();
    }
    console.log(userData)
    let panes = []
   
    if (isUserLoaded) {
        panes = userData.map(function(userCase){
            return(
                {menuItem: userCase.startDate + ": " + userCase.type,
                render: () => <ProgCard 
                                userCase = {userCase}
                                isClient = {true}
                                />
                }
            )
        });
    }
    
  return (
    <Container style={{marginBottom: '-15vh'}}>
      <Tab
        renderActiveOnly={true}
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  );
  
};

export default CaseDetailsComponent;
