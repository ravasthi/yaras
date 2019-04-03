```js
require('../../src/lib/fontAwesome');
import AlertContainer from './AlertContainer';

<AlertContainer>
    <Alert severity="warning">Running low on disk space: 10% remaining.</Alert>
    <Alert severity="info" showIcon>
        The system will be under maintenance from <strong>12am–1am</strong>.
    </Alert>
    <Alert severity="success" showIcon>Your profile was saved.</Alert>
    <Alert severity="warning" showIcon>Running low on disk space: 10% remaining.</Alert>
    <Alert severity="error" showIcon>Something went wrong.</Alert>
</AlertContainer>
```
