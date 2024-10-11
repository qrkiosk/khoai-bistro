import React from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Page className="page">
      <List>
        <List.Item suffix={<Icon icon="zi-arrow-right" />}>
          <div onClick={() => navigate("/plp")}>Product List</div>
        </List.Item>
      </List>
    </Page>
  );
};

export default HomePage;
