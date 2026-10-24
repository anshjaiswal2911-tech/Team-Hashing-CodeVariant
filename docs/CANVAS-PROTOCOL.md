# Canvas Protocol — Interaction and Integration Notes

## Overview

The Canvas Protocol is an interactive workspace in Project Graveyard that lets users move dormant project specimens between diagnostic and action drop zones using drag-and-drop interactions.

## Workflow

1. **Select a specimen:** A project card represents a dormant project and carries its specimen data.
2. **Drag and transfer:** The user drags a specimen card into an appropriate drop zone.
3. **Read the payload:** The receiving component reads the drag-and-drop payload and retrieves the specimen data.
4. **Dispatch the action:** The corresponding handler processes the specimen for the selected workflow.
5. **Provide feedback:** The interface communicates the active drop target and responds to the user's interaction.

## Integration points

The Canvas Protocol's drop-zone component connects drag-and-drop interactions to four handlers:

- **Autopsy:** `onAutopsyDrop`
- **Revival:** `onRevivalDrop`
- **Digital Will:** `onDigitalWillDrop`
- **Exhume:** `onExhumeDrop`

The drag-and-drop integration uses the `application/json` data format to transfer specimen information between components.

## Interaction considerations

- Keep the specimen payload consistent between the component initiating a drag and the component receiving it.
- Ensure each drop zone invokes its intended handler.
- Provide clear visual feedback when a drop target becomes active.
- Test the workflow with valid specimen data and verify that each action reaches the correct handler.
- Preserve existing project behavior when making changes to the shared interaction flow.

## Contribution acknowledgement

Mitesh Jha contributed to the Canvas Protocol's technical planning, interaction requirements, drag-and-drop workflow validation, and integration guidance. This document records the workflow and integration points to support review and future maintenance.

The application code and behavior remain the source of truth for implementation details.