import styled from "styled-components";

/** App theme */
import colors from "../../theme/colors";

export const BodyContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${colors.grey};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const CenterContent = styled.div`
  display: flex;
  flex: 1;
`;

export const NavigationHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 70px;
  background-color: ${colors.white};
  padding: 10px;

  span {
    position: relative;
    right: 10px;
    font-size: 2em;
    color: ${colors.antdBlue};

    &:hover {
      cursor: pointer;
      color: ${colors.black};
    }
  }
`;
