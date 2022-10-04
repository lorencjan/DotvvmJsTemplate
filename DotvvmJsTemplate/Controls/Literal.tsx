import * as React from 'react';
import { Text } from '@fluentui/react';

type LiteralProps = {
    text: string;
}

const Literal: React.FC<LiteralProps> = ({ text }) => <Text>{text}</Text>;

export default Literal;