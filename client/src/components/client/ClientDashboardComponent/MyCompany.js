import React, { useState } from "react";
import { Button, Grid, Image, Form, Card } from "semantic-ui-react";
import { getCurrentUser } from "../../../../src/api/UserApi";

const defaultImage = "https://react.semantic-ui.com/images/wireframe/image.png";
function MyCompany() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [hasCompany, setHasCompany] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const loadUserData = async () => {
    const user = (await getCurrentUser()).data;
    if (user) {
      setUserData(user);
      if (user.company) {
        setHasCompany(true);
      }
      setIsUserLoaded(true);
    }
  };
  if (!isUserLoaded) {
    loadUserData();
  }

  const getLogoUrl = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Card unstackable fluid centered>
        <Grid
          unstackable
          padded="vertically"
          divided="vertically"
          style={{ margin: 30 }}
        >
          <Grid.Row className={!hasCompany ? "hidden" : ""}>
            <h3>Company Information</h3>
          </Grid.Row>
          <Grid.Row className={!hasCompany ? "hidden" : ""}>
            <Grid.Column floated="left" stretched={true}>
              <Grid.Row stretched={true} textAlign="left">
                <Form widths="equal">
                  <Form.Input
                    className="wrap"
                    label="Logo URL"
                    type="text"
                    placeholder="Logo URL"
                    labelPosition="left"
                    value={logoUrl}
                    onChange={getLogoUrl}
                  />
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
            </Grid.Column>

            <Grid.Column floated="right" width={5}>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    </div>
  );
}

export default MyCompany;
