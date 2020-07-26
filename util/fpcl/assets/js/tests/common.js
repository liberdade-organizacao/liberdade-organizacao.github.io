/* ######################
   # AUXILIAR FUNCTIONS #
   ###################### */
function assertEqualFpcl(expected, result) {
    let listsHaveSameLength = function(a, b) {
        return a.length === b.length;
    }

    let listsHaveContent = function(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    let conclusion = listsHaveSameLength(expected, result) &&
                     listsHaveContent(expected, result);

    chai.assert(conclusion, 'Lists are equal');
}


/* ##############
   # UNIT TESTS #
   ############## */
describe('FPCL Convertion', function() {
    describe('Converting from FPCL', function() {  // fpclToChecklists()
        it('Should convert a single list correctly', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item
`
            var expectedChecklists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists correctly', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item

# Another checklist

- [x] done stuff
- [x]I am the king of stuff
`
            var expectedChecklists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Another checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("done stuff"),
                            "done": true
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("I am the king of stuff"),
                            "done": true
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists correctly, even if it includes an empty list', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item

# Empty Checklist

# Not empty checklist

- [ ] to do
`
            var expectedChecklists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title":encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title":encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }, {
                    "title":encodeURIComponent("Empty Checklist"),
                    "items": []
                }, {
                    "title":encodeURIComponent("Not empty checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title":encodeURIComponent("to do"),
                            "done": false
                        }
                    ]
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists correctly, even if it includes an empty list in the end', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item

# Not empty checklist

- [ ] to do

# Empty Checklist

`
            var expectedChecklists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Not empty checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("to do"),
                            "done": false
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Empty Checklist"),
                    "items": []
                }
            ]
            var resultingChecklists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedChecklists, resultingChecklists);
        });

        it('Should convert a couple of lists with notes', function() {
            var fpcl = `# Your first checklist

- [ ] Something to do
- [x] Done item
FPCL's first note

# Note only checklist

This checklist contains a note only,
with two lines of notes.

# Empty Checklist

`
            var expectedLists = [
                {
                    "title": encodeURIComponent("Your first checklist"),
                    "items": [
                        {
                            "kind": "todo",
                            "title": encodeURIComponent("Something to do"),
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": encodeURIComponent("Done item"),
                            "done": true
                        }, {
                            "kind": "note",
                            "title": encodeURIComponent("FPCL's first note")
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Note only checklist"),
                    "items": [
                        {
                            "kind": "note",
                            "title": encodeURIComponent("This checklist contains a note only,")
                        }, {
                            "kind": "note",
                            "title": encodeURIComponent("with two lines of notes.")
                        }
                    ]
                }, {
                    "title": encodeURIComponent("Empty Checklist"),
                    "items": []
                }
            ]
            var resultingLists = fpclToChecklists(fpcl);
            assertEqualFpcl(expectedLists, resultingLists);
        });
    });

    describe("Converting to FPCL", function() { // checklistsToFpcl()
        it("Should convert checklists to Markdown", function() {
            var checklists = [
                {
                    "title": "Your first checklist",
                    "items": [
                        {
                            "kind": "todo",
                            "title": "Something to do",
                            "done": false
                        }, {
                            "kind": "todo",
                            "title": "Done item",
                            "done": true
                        }
                    ]
                }
            ];

            var expected = `# Your first checklist

- [ ] Something to do
- [x] Done item
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });

        it("Should convert notes to Markdown", function() {
            var checklists = [
                {
                    "title": "Your first list",
                    "items": [
                        {
                            "kind": "note",
                            "title": "Your first note"
                        }
                    ]
                }
            ];

            var expected = `# Your first list

Your first note
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });

        it("Shouldn't mix notes and to do items", function() {
            var checklists = [
                {
                    "title": "Your first list",
                    "items": [
                        {
                            "kind": "todo",
                            "title": "First item",
                            "done": false
                        }, {
                            "kind": "note",
                            "title": "Second item"
                        }, {
                            "kind": "note",
                            "title": "Third item"
                        }, {
                            "kind": "todo",
                            "title": "Fourth item",
                            "done": false
                        }
                    ]
                }
            ];

            var expected = `# Your first list

- [ ] First item
Second item
Third item
- [ ] Fourth item
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });

        it("Should draw lists with space between then", function() {
            var checklists = [
                {
                    "title": "Your first list",
                    "items": [
                        {
                            "kind": "todo",
                            "title": "An item",
                            "done": false
                        }
                    ]
                }, {
                    "title": "Your second list",
                    "items": [
                        {
                            "kind": "note",
                            "title": "Another item"
                        }
                    ]
                }
            ];

            var expected = `# Your first list

- [ ] An item

# Your second list

Another item
`;

            var result = checklistsToFpcl(checklists);
            chai.assert.equal(expected, result);
        });
    });
});

describe("Auxiliar Functions", function() {
    describe("Identify Kind", function() {
        it("Should correctly identify the line kind", function() {
            let scenarios = [
                {
                    content: "",
                    expected: "empty"
                }, {
                    content: "# Title",
                    expected: "title"
                }, {
                    content: "- [ ] To do task",
                    expected: "todo"
                }, {
                    content: "- [x] Done task",
                    expected: "todo"
                }, {
                    content: "Random content",
                    expected: "note"
                }, {
                    content: "- List",
                    expected: "note"
                },
            ];
            for (var i = 0; i < scenarios.length; i++) {
                var scenario = scenarios[i];
                var result = identifyKind(scenario.content);
                chai.assert.equal(scenario.expected, result);
            }
        });
    });
});
