/* eslint-disable no-undef */
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

const updateFields = async (key, name, mensagemEVP) => {
	const organizationID = fragmentElement.querySelector('.organizationID').value;

	// eslint-disable-next-line @liferay/portal/no-global-fetch
	await fetch(`/o/c/evporganizations/${organizationID}`, {
		body: `{
		"organizationStatus":{
		   "key":"${key}",
		   "name":"${name}"
		},
		"messageEVPManager": "${mensagemEVP}"
	 }`,
		headers: {
			'content-type': 'application/json',
			'x-csrf-token': Liferay.authToken,
		},
		method: 'PATCH',
	});

	location.reload();
};
const openModal = () => {

	const organizationName = fragmentElement.querySelector('.organizationName').innerHTML;


	Liferay.Util.openModal({

		bodyHTML:
			'<textarea id="messageDescribed" style="word-wrap: break-word;width:100%;height: 10em;resize: none; border-style: inset;border-width: 1px;border-radius: 5px;" placeholder="Describe here..."></textarea>' +
			'<div id="tooltip" class="alert alert-danger" style="display:none;>Message is required.</div>',


		buttons: [
			{
				displayType: 'danger',
				label: 'Reject',
				async onClick() {
					const messageDescribed = document.querySelector('#messageDescribed');
					const tooltip = document.querySelector('#tooltip');

					if (messageDescribed.value === '') {
						tooltip.style.display = 'block';

					} else {
						tooltip.style.display = 'none';
						const textModal = messageDescribed.value;
						await updateFields('rejected', 'Rejected', textModal);
					}
				},
				type: 'submit',
			},
			{
				displayType: 'success',
				label: 'Approve',
				async onClick() {
					const messageDescribed = document.querySelector('#messageDescribed');
					const tooltip = document.querySelector('#tooltip');

					if (messageDescribed.value === '') {
						tooltip.style.display = 'block';


					} else {
						tooltip.style.display = 'none';
						const textModal = messageDescribed.value;

						await updateFields(
							'awaitingFinanceApproval',
							'Awaiting Finance Approval',
							textModal
						);
					}
				},
				type: 'submit',
			},
		],
		center: true,
		headerHTML: `<p class="headerTextModal"> Approve or Reject the organization ${organizationName} </p>`,
		size: 'md',
	});
};

const btnOpenModal = fragmentElement.querySelector('.btnOpenModal');

if (btnOpenModal) {
	btnOpenModal.onclick = openModal;
}
