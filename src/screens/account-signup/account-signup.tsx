import { Button, Container, Content, Form, Input, Item, Label, Text, Toast } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { NavigationService } from '../../services';

interface Props {}

interface State {
    email: string;
    password: string;
}

export class AccountSignup extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    public render() {
        return (
            <Container>
                <Header
                    headerRight={
                        <Button hasText transparent onPress={this.registerUser}>
                            <Text>Save</Text>
                        </Button>
                    }
                >
                    Register
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email Address</Label>
                            <Input
                                onChangeText={(email: string) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(password: string) => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }

    private registerUser = async () => {
        const response = await fetch('https://spaced-repetition-api.joeywohleb.com/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        });

        if (response.status !== 200) {
            Toast.show({
                text: response.statusText,
                buttonText: 'Okay',
            });
            return;
        }

        Toast.show({
            text: 'Account created!',
            buttonText: 'Okay',
        });
        NavigationService.goBack();
    };
}
