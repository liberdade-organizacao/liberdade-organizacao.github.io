// #####################
// # DRAWING FUNCTIONS #
// #####################

/**
 * Generates a card to display on the list view. When it is clicked, it should
 * be displayed on the main content div.
 * @param checklists the list of all checklists
 * @param i the reference checklist
 * @returns the HTML for the checklist card following the standard set by the
 *          home page
 */
function generateChecklistCard(checklists, i) {
    var checklist = checklists[i];
    return `
    <div class="email-item pure-g" onclick="displayChecklist(` + i + `)" id="checklist-` + i + `">
        <div class="pure-u">
            <img width="64" height="64" alt="Checklist" class="email-avatar" src="https://via.placeholder.com/64/FFCD8A/000000/?text=Checklist">
        </div>

        <div class="pure-u-3-4">
            <h5 class="email-name">` + checklist.title + `</h5>
            <p class="email-desc">
                <i class="fa fa-trash" aria-hidden="true" onclick="deleteChecklistCallback(${i})"></i>
            </p>
        </div>
    </div>`;
}

/**
 * Draws the checklist list on screen
 */
function displayChecklistList() {
    var checklists = loadChecklists();
    var checklistsHTML = "";
    for (var i = 0; i < checklists.length; i++) {
        checklistsHTML += generateChecklistCard(checklists, i);
    }
    document.getElementById('list').innerHTML = checklistsHTML;
}

/**
 * Creates a trash icon for a list item
 * @param index list index
 * @param i item index inside list
 * @returns HTML for trash icon
 */
function generateTrashIcon(index, i) {
    return `<i class="fa fa-trash" aria-hidden="true" onclick="deleteItemCallback(${index}, ${i})"></i>`;
}

/**
 * Creates a task for a list item
 * @param item the task item
 * @param index list index
 * @param i item index inside list
 * @returns HTML for task item
 */
function generateTodoItem(item, index, i) {
    var checkboxId = "checkbox-" + index + "-" + i;
    var textId = "text-" + index + "-" + i;
    var checked = (item.done)? "checked" : "";

    return `
        <p>
            <input type="checkbox" id="${checkboxId}" name="checkbox" value="${checkboxId}" ${checked}>
            <input type="text" name="block-text" id="label-${checkboxId}" class="textboxLabel editable-title" for="${checkboxId}" value="${item.title}">
            ${generateTrashIcon(index, i)}
        </p>
    `;
}

/**
 * Creates a tnote for a list item
 * @param item the note item
 * @param index list index
 * @param i item index inside list
 * @returns HTML for note item
 */
function generateNoteItem(item, index, i) {
    var noteId = `note-${index}-${i}`;
    return `
        <p>
            <input type="text" name="block-text" id="label-${noteId}" class="textboxLabel editable-title" value="${item.title}">
            ${generateTrashIcon(index, i)}
        </p>
    `;
}

/**
 * Generates the main div content for a checklist
 * @param checklists the list of all checklists
 * @param index the reference checklist
 * @retuns the HTML for the checklist content following the standard set by the
 *         home page
 */
function generateChecklistContent(checklists, index) {
    var checklist = checklists[index];
    var checklistBody = "";

    const generatorsByKind = {
        note: generateNoteItem,
        todo: generateTodoItem
    }

    // TODO move items around
    for (var i = 0; i < checklist.items.length; i++) {
        var item = checklist.items[i];
        var itemBody = generatorsByKind[item.kind](item, index, i);
        checklistBody += itemBody;
    }

    return `
    <div class="email-content">
        <div class="email-content-header pure-g">
            <div class="pure-u-1-2">
                <input type="text" class="editable-title somehow-big email-content-title" value="${checklist.title}">
            </div>

            <div class="email-content-controls pure-u-1-2">
                <button class="secondary-button pure-button" onclick="saveCallback(${index})">Save</button>
            </div>
        </div>

        <div class="email-content-body">
            ${checklistBody}
            <p>
                <button class="secondary-button pure-button" onclick="addItemCallback(${index})">New note</button>
                <button class="secondary-button pure-button" onclick="addTaskCallback(${index})">New task</button>
            </p>
        </div>
    </div>`;
}

/**
 * Displays a checklist referenced by its index on the main content div
 * @param i the checklist reference index
 */
function displayChecklist(i) {
    document.getElementById('main').innerHTML = generateChecklistContent(loadChecklists(), i);
    document.getElementById('checklist-' + i).classList.add('active');
    // TODO set remaining lists as inactive
}

/**
 * Generates a checklist from the contents of the main div
 * @returns the checklist that is described on the main content
 */
function readChecklist() {
    var items = [];
    var blocks = document.getElementsByName('block-text');

    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        var checkbox = document.getElementById(block.getAttribute('for'));
        var item = {
            kind: (!checkbox)? 'note' : 'todo',
            title: block.value
        };

        if (!!checkbox) {
            item.done = checkbox.checked;
        }

        items.push(item);
    }

    return {
        "title": document.getElementsByClassName('email-content-title')[0].value,
        "items": items
    };
}

/**
 * Searches for the label related to an element as referenced by its id
 * @param id the reference element id
 * @returns the label that is related to the reference element
 */
function findLabelForCheckbox(id) {
    var labels = document.getElementsByClassName('textboxLabel');
    var targetId = "label-" + id;
    for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        if (label.id === targetId) {
            return label;
        }
    }
    return null;
}

// #############
// # CALLBACKS #
// #############

/**
 * Reaction to clicking the "New List" button
 */
function newListCallback() {
    var checklists = loadChecklists();
    checklists.push(createDummyChecklist());
    saveChecklists(checklists);
    displayChecklistList();
}

/**
 * Reaction to clicking "Save" on a list
 */
function saveCallback(index) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    checklists[index] = checklist;
    saveChecklists(checklists);
    displayChecklistList();
}

/**
 * Reaction to clicking "Add Item" on a list
 */
function addItemCallback(index) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    checklist.items.push({
        "kind": "note",
        "title": "New item"
    })
    checklists[index] = checklist;
    saveChecklists(checklists);
    displayChecklist(index);
}

/**
 * Reaction to clicking "Add task" on a list
 */
function addTaskCallback(index) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    checklist.items.push({
        "kind": "todo",
        "title": "New item",
        "done": false
    })
    checklists[index] = checklist;
    saveChecklists(checklists);
    displayChecklist(index);
}

/**
 * Reaction to clicking the trashbox icon on an item
 */
function deleteItemCallback(checklistIndex, itemIndex) {
    var checklists = loadChecklists();
    var checklist = readChecklist();
    var newItems = [];

    for (var i = 0; i < checklist.items.length; i++) {
        if (i !== itemIndex) {
            newItems.push(checklist.items[i]);
        }
    }

    checklist.items = newItems;
    checklists[checklistIndex] = checklist;
    saveChecklists(checklists);
    displayChecklist(checklistIndex);
}

/**
 * Reaction to clicking the trashbox icon on a checklist
 */
function deleteChecklistCallback(checklistIndex) {
    var checklists = loadChecklists();
    var newChecklists = [];

    for (var i = 0; i < checklists.length; i++) {
        if (i !== checklistIndex) {
            newChecklists.push(checklists[i]);
        }
    }

    saveChecklists(newChecklists);
    displayChecklistList();
}

/**
 * Reaction to clicking "Menu". Should appear on mobile only.
 */
function navMenuButtonCallback() {
    var nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

// ##################
// # MAIN FUNCTIONS #
// ##################

/**
 * Call when the page is first loaded
 */
function setup() {
    var checklists = loadChecklists();
    if (checklists.length === 0) {
        checklists.push(createDummyChecklist());
        // TODO display empty page
    }
    saveChecklists(checklists);
}

/**
 * Draw contents on screen
 */
function draw() {
    displayChecklistList();
}
