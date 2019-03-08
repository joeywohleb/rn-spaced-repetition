import { Body, Header as Container, Title } from 'native-base';
import React, { Component } from 'react';

interface Props {
    children: string;
}

export class Header extends Component<Props> {
    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Body>
                    <Title>{this.props.children}</Title>
                </Body>
            </Container>
        );
    }
}
