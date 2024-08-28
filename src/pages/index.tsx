import React from "react";
import { Box, List, Page, Icon, useNavigate } from "zmp-ui";
import { useRecoilValue } from "recoil";

import { userState } from "../state";
import UserCard from "../components/UserCard";
import Section from "../components/Section";

const HomePage: React.FunctionComponent = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <Page className="page">
      <Section>
        <UserCard user={user} />
      </Section>
      <Section>
        <List>
          <List.Item suffix={<Icon icon="zi-arrow-right" />}>
            <div onClick={() => navigate("/plp")}>Product List</div>
          </List.Item>
        </List>
      </Section>
    </Page>
  );
};

export default HomePage;
