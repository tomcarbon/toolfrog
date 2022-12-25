import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function APIDropdown() {
  return (
    <DropdownButton id="dropdown-basic-button" title="BlockCypher API">
      <Dropdown.Item href="#/action-1">BlockCypher API</Dropdown.Item>
      <Dropdown.Item href="#/action-2">TBD API</Dropdown.Item>
    </DropdownButton>
  );
}

export default APIDropdown;