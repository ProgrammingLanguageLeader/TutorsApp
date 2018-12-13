import React from 'react';
import { connect } from 'react-redux';
import {
  View, Panel, PanelHeader, Cell, Avatar, Button, Input, FormLayout,
  Textarea, HeaderButton, Group, PopoutWrapper, ScreenSpinner
} from '@vkontakte/vkui';

import Icon36Done from '@vkontakte/icons/dist/36/done';
import Icon36Cancel from '@vkontakte/icons/dist/36/cancel';

import BackIcon from '../components/BackIcon';
import DivSpinner from '../components/DivSpinner';
import PopoutDiv from '../components/PopoutDiv';

import { apiProfileActions, locationActions  } from '../actions';

const mapStateToProps = (state) => {
  const { vkUserInfo } = state.vkAppsUserReducer;
  const { profile } = state.apiProfileReducer;
  const apiProfileFetching = state.apiProfileReducer.fetching;
  const vkAppsUserFetching = state.vkAppsUserReducer.fetching;
  const apiProfileErrors = state.apiProfileReducer.errors;
  return {
    vkUserInfo, profile, apiProfileFetching, vkAppsUserFetching, apiProfileErrors
  };
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popout: null,
      experience: '',
      education: '',
      city: '',
      district: '',
      street: '',
      metro_station: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    const { id, signed_user_id } = this.props.vkUserInfo;
    this.props.dispatch(
      apiProfileActions.getProfile({
        user_id: id,
        signed_user_id: signed_user_id,
        profile_id: id,
      })
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.profile
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  updateProfile(event) {
    event.preventDefault();

    const { id, signed_user_id } = this.props.vkUserInfo;
    this.setState({
      popout: <ScreenSpinner/>
    });
    this.props.dispatch(
      apiProfileActions.updateProfile({
        user_id: id,
        signed_user_id: signed_user_id,
        ...this.state
      })
    )
      .then(() => {
        const { apiProfileErrors } = this.props;
        this.setState({
          popout: !apiProfileErrors
            ? (
              <PopoutWrapper>
                <PopoutDiv>
                  <Icon36Done/>
                </PopoutDiv>
              </PopoutWrapper>
            )
            : (
              <PopoutWrapper>
                <PopoutDiv>
                  <Icon36Cancel/>
                </PopoutDiv>
              </PopoutWrapper>
            )
        })
      })
      .then(setTimeout(() => {
        this.setState({
          popout: null
        })
      },1500))
  }

  render() {
    const { vkUserInfo, apiProfileFetching, vkAppsUserFetching } = this.props;
    const {
      experience, education, city, district, street, metro_station, description
    } = this.state;
    const fetching = apiProfileFetching || vkAppsUserFetching;

    return (
      <View id={this.props.id} activePanel="edit_profile" popout={this.state.popout}>
        <Panel id="edit_profile">
          <PanelHeader
            left={
              <HeaderButton key="back" onClick={() => this.props.dispatch(locationActions.goBack())}>
                <BackIcon />
              </HeaderButton>
            }
          >
            Изменение профиля
          </PanelHeader>
          {
            fetching
            ? (
              <DivSpinner />
            )
            : (
              <div>
                <Group>
                  <Cell
                    size="l"
                    multiline
                    description="Здесь можно посмотреть и отредактировать публичную информацию о Вашем профиле"
                    before={<Avatar size={80} src={vkUserInfo.photo_200} />}
                  >
                    {`${vkUserInfo.first_name} ${vkUserInfo.last_name}`}
                  </Cell>
                </Group>
                <Group title="Информация о пользователе">
                  <FormLayout>
                    <Input
                      name="experience"
                      top="Опыт преподавания"
                      value={experience ? experience : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="education"
                      top="Образование"
                      value={education ? education : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="city"
                      top="Город"
                      value={city ? city : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="district"
                      top="Район"
                      value={district ? district : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="street"
                      top="Улица"
                      value={street ? street : ""}
                      onChange={this.handleChange}
                    />

                    <Input
                      name="metro_station"
                      top="Станция метро"
                      value={metro_station ? metro_station : ""}
                      onChange={this.handleChange}
                    />

                    <Textarea
                      name="description"
                      top="О себе"
                      value={description ? description : ""}
                      onChange={this.handleChange}
                    />
                    <Button size="xl" onClick={this.updateProfile}>
                      Сохранить
                    </Button>
                  </FormLayout>
                </Group>
              </div>
            )
          }
        </Panel>
      </View>
    );
  }
}

export default connect(mapStateToProps)(EditProfile);
