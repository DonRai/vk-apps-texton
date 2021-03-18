import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Word from './panels/Word';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [panelOptions, setPanelOptions] = useState({});
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
    
    setPopout(null);
	}, []);

	const go = (panel, options) => {
		setActivePanel(panel);
		setPanelOptions(options);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' go={go} />
					<Word id='word' go={go} options={panelOptions} />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

