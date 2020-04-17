import React, { useState, useEffect } from "react";
import { Button, Grid, Image, Form, Icon } from "semantic-ui-react";
import { getCurrentUser, updateUserData } from "../../../../src/api/UserApi";

const defaultImage = "https://react.semantic-ui.com/images/wireframe/image.png";
function MyCompany(props) {
  const [logoUrl, setLogoUrl] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [hasCompany, setHasCompany] = useState(false)

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (isUserLoaded) {
      abortController.abort();
    }
  }, []);

  const RefreshPage = () => {
    window.location.reload(false)
  }

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    if (user) {
      setUserData(user);
      if(user.company){
        setHasCompany(true)
      }
      if(user.company && user.company.companyLogoUrl){
        setLogoUrl(user.company.companyLogoUrl)
      }
      
      setIsUserLoaded(true);
      props.setIsLoading(false);
    }
  };
  if (!isUserLoaded) {
    props.setIsLoading(true);
    loadUserData();
  }

  const saveLogoUrl = async () => {
    if(hasCompany){
      const data = {
        company:{
          companyLogoUrl: logoUrl,
          companyName: userData.company.companyName,
          website: userData.company.website
        }
      }
  
      const res = await updateUserData(data)
      if(res){
        alert("Your company logo has been updated successfully");
        RefreshPage()
      }
    }
  }

  const getLogoUrl = (e) => {
    e.preventDefault();
    setLogoUrl(e.target.value)
  };

  return (
    <div>
      <Grid
        unstackable
        padded="vertically"
        divided="vertically"
        style={{ margin: 30 }}
      >
        <Grid.Row>
          <h3>Company Information</h3>
        </Grid.Row>

        <Grid.Row textAlign="left">
          <Grid.Column floated="left" stretched={true}>
            <div style={{marginRight:10}}>
              <Grid.Row stretched={true} textAlign="left">
                <Form widths="equal">
                  <Form.Group inline>
                    <Form.Input
                      className="wrap"
                      label="Logo URL"
                      type="text"
                      placeholder="Logo URL"
                      labelPosition="left"
                      value={logoUrl}
                      onChange={getLogoUrl}
                    />
                    <div>
                      <Button disabled={!hasCompany} onClick={saveLogoUrl}>
                        <Button.Content>
                          <Icon name="save" />
                        </Button.Content>
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Input
                    className="wrap"
                    label="Company"
                    type="text"
                    placeholder="Company"
                    labelPosition="left"
                    readOnly
                    value={
                      !(userData && userData.company)
                        ? ""
                        : userData.company.companyName
                    }
                  />

                  <Form.Input
                    className="wrap"
                    label="Website"
                    type="text"
                    placeholder="Website"
                    labelPosition="left"
                    readOnly
                    value={
                      !(userData && userData.company)
                        ? ""
                        : userData.company.website
                    }
                  ></Form.Input>
                </Form>
              </Grid.Row>
            </div>
          </Grid.Column>

          <Grid.Column floated="right" width={5}>
          <div style={{marginLeft:40, textAlign:'center'}}>
          <p>Company Logo</p>
            <Image
              src={
                !(userData && userData.company)
                  ? defaultImage
                  : userData.company.companyLogoUrl
              }
              size="huge"
              rounded
              fluid
            />
          </div>
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default MyCompany;
