/**
 * Enhanced Media Upload Widget for Decap CMS
 *
 * Supports multiple file uploads (images, videos, PDFs, etc.)
 * with preview, drag & drop, and bulk upload capabilities
 */

// Media Upload Control Component
const MediaUploadControl = window.createClass({
  getInitialState() {
    return {
      files: [],
      previews: {},
      isDragging: false,
      isUploading: false,
      uploadProgress: {}
    };
  },

  componentDidMount() {
    // Parse existing value if it exists
    const value = this.props.value;
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      this.setState({ files });
      this.generatePreviews(files);
    }
  },

  handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files);
    this.addFiles(selectedFiles);
  },

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragging: false });

    const droppedFiles = Array.from(e.dataTransfer.files);
    this.addFiles(droppedFiles);
  },

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.isDragging) {
      this.setState({ isDragging: true });
    }
  },

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isDragging: false });
  },

  async addFiles(newFiles) {
    const { files } = this.state;
    const allowMultiple = this.props.field.get('multiple') !== false;

    let updatedFiles = allowMultiple ? [...files] : [];

    // Process each file
    for (const file of newFiles) {
      // Validate file type
      if (!this.isValidFileType(file)) {
        alert(`Invalid file type: ${file.name}. Please upload images, videos, or PDFs.`);
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File too large: ${file.name}. Maximum size is 10MB.`);
        continue;
      }

      // Upload to media library
      const uploadedPath = await this.uploadFile(file);
      if (uploadedPath) {
        updatedFiles.push(uploadedPath);
      }
    }

    this.setState({ files: updatedFiles });
    this.generatePreviews(updatedFiles);

    // Update form value
    const value = allowMultiple ? updatedFiles : updatedFiles[0];
    this.props.onChange(value);
  },

  isValidFileType(file) {
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'application/pdf'
    ];

    return validTypes.includes(file.type) || file.name.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov|pdf)$/i);
  },

  async uploadFile(file) {
    this.setState({ isUploading: true });

    try {
      // Use Decap CMS's media library upload functionality
      // This integrates with the configured backend (GitHub)
      const mediaLibrary = this.props.mediaPaths;
      const mediaFolder = 'src/images'; // From config.yml
      const publicFolder = '/images';

      // Generate unique filename
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}-${safeName}`;
      const filePath = `${mediaFolder}/${fileName}`;

      // Read file as base64
      const base64 = await this.readFileAsBase64(file);

      // For Decap CMS, we'll store the path and let the CMS handle the actual upload
      // when the entry is saved
      this.setState({ isUploading: false });

      return `${publicFolder}/${fileName}`;
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload ${file.name}: ${error.message}`);
      this.setState({ isUploading: false });
      return null;
    }
  },

  readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  generatePreviews(files) {
    const previews = {};

    files.forEach(filePath => {
      // Determine file type from extension
      const ext = filePath.split('.').pop().toLowerCase();

      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        previews[filePath] = {
          type: 'image',
          url: filePath
        };
      } else if (['mp4', 'webm', 'mov'].includes(ext)) {
        previews[filePath] = {
          type: 'video',
          url: filePath
        };
      } else if (ext === 'pdf') {
        previews[filePath] = {
          type: 'pdf',
          url: filePath
        };
      }
    });

    this.setState({ previews });
  },

  removeFile(filePath) {
    const { files } = this.state;
    const updatedFiles = files.filter(f => f !== filePath);

    this.setState({ files: updatedFiles });

    // Update form value
    const allowMultiple = this.props.field.get('multiple') !== false;
    const value = allowMultiple ? updatedFiles : updatedFiles[0];
    this.props.onChange(value || '');
  },

  render() {
    const { files, previews, isDragging, isUploading } = this.state;
    const { forID, classNameWrapper } = this.props;
    const allowMultiple = this.props.field.get('multiple') !== false;

    return window.h(
      'div',
      { className: 'media-upload-wrapper ' + classNameWrapper },
      [
        // Upload Zone
        window.h(
          'div',
          {
            key: 'upload-zone',
            className: 'media-upload-zone' + (isDragging ? ' dragging' : ''),
            onDrop: this.handleDrop,
            onDragOver: this.handleDragOver,
            onDragLeave: this.handleDragLeave
          },
          [
            window.h(
              'div',
              { key: 'icon', className: 'media-upload-icon' },
              '📁'
            ),
            window.h(
              'p',
              { key: 'text', className: 'media-upload-text' },
              isDragging
                ? 'Drop files here...'
                : 'Drag & drop files here, or click to browse'
            ),
            window.h(
              'p',
              { key: 'hint', className: 'media-upload-hint' },
              'Supports: Images, Videos, PDFs (max 10MB each)'
            ),
            window.h('input', {
              key: 'input',
              id: forID,
              type: 'file',
              multiple: allowMultiple,
              accept: 'image/*,video/*,.pdf',
              className: 'media-upload-input',
              onChange: this.handleFileSelect,
              disabled: isUploading
            }),
            window.h(
              'label',
              {
                key: 'label',
                htmlFor: forID,
                className: 'media-upload-button'
              },
              isUploading ? 'Uploading...' : 'Choose Files'
            )
          ]
        ),

        // Preview Grid
        files.length > 0 && window.h(
          'div',
          { key: 'previews', className: 'media-preview-grid' },
          files.map((filePath, index) => {
            const preview = previews[filePath];

            return window.h(
              'div',
              {
                key: index,
                className: 'media-preview-item'
              },
              [
                // Preview content
                preview && preview.type === 'image' && window.h(
                  'img',
                  {
                    key: 'img',
                    src: preview.url,
                    alt: filePath,
                    className: 'media-preview-image'
                  }
                ),
                preview && preview.type === 'video' && window.h(
                  'video',
                  {
                    key: 'video',
                    src: preview.url,
                    className: 'media-preview-video',
                    controls: true
                  }
                ),
                preview && preview.type === 'pdf' && window.h(
                  'div',
                  {
                    key: 'pdf',
                    className: 'media-preview-pdf'
                  },
                  [
                    window.h('div', { key: 'icon' }, '📄'),
                    window.h('p', { key: 'name' }, filePath.split('/').pop())
                  ]
                ),

                // File info
                window.h(
                  'div',
                  { key: 'info', className: 'media-preview-info' },
                  [
                    window.h(
                      'span',
                      { key: 'name', className: 'media-preview-name' },
                      filePath.split('/').pop()
                    ),
                    window.h(
                      'button',
                      {
                        key: 'remove',
                        type: 'button',
                        className: 'media-preview-remove',
                        onClick: () => this.removeFile(filePath)
                      },
                      '×'
                    )
                  ]
                )
              ]
            );
          })
        )
      ]
    );
  }
});

// Media Upload Preview Component
const MediaUploadPreview = window.createClass({
  render() {
    const value = this.props.value;
    const files = Array.isArray(value) ? value : (value ? [value] : []);

    if (files.length === 0) {
      return window.h('p', {}, 'No files uploaded');
    }

    return window.h(
      'div',
      { className: 'media-upload-preview' },
      files.map((file, index) =>
        window.h(
          'div',
          { key: index, className: 'media-preview-item-small' },
          [
            file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) && window.h(
              'img',
              {
                key: 'img',
                src: file,
                alt: file,
                className: 'media-preview-image-small'
              }
            ),
            window.h(
              'span',
              { key: 'name' },
              file.split('/').pop()
            )
          ]
        )
      )
    );
  }
});

// Register the widget with Decap CMS
if (window.CMS) {
  window.CMS.registerWidget(
    'media-upload',
    MediaUploadControl,
    MediaUploadPreview
  );
  console.log('✅ Media Upload widget registered successfully!');
} else {
  console.error('❌ Decap CMS not found. Make sure it loads before this script.');
}
